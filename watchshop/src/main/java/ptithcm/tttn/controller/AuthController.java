package ptithcm.tttn.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ptithcm.tttn.config.JwtTokenProvider;
import ptithcm.tttn.entity.User;
import ptithcm.tttn.request.SignInRequest;
import ptithcm.tttn.request.SignUpRequest;
import ptithcm.tttn.response.ApiResponse;
import ptithcm.tttn.response.AuthResponse;
import ptithcm.tttn.service.UserService;
import ptithcm.tttn.service.impl.UserDetailsServiceImpl;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final UserDetailsServiceImpl userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthController(UserService userService, UserDetailsServiceImpl userDetailsService, PasswordEncoder passwordEncoder, 	JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<ApiResponse> signUp(@RequestBody SignUpRequest rq){
        ApiResponse res = new ApiResponse();
        HttpStatus httpStatus = null;
        if(!rq.getEmail().equals("") && !rq.getPhone().equals("")  && !rq.getLastname().equals("") && !rq.getFirstname().equals("") && !rq.getPassword().equals("") && !rq.getUsername().equals("") && !rq.getRole_name().equals("")) {
        try{
           
                User user = userService.createUser(rq);
                res.setCode(HttpStatus.CREATED.value());
                res.setMessage("Create user success");
                res.setStatus(HttpStatus.CREATED);
                httpStatus = HttpStatus.CREATED;
            
        }catch (Exception e){
            System.out.println("error" + e.getMessage());
            res.setCode(HttpStatus.CONFLICT.value());
            res.setStatus(HttpStatus.CONFLICT);
            res.setMessage("error" + e.getMessage());
            httpStatus = HttpStatus.CONFLICT;
        }
        }else {
            httpStatus = HttpStatus.CONFLICT;
            res.setCode(HttpStatus.CONFLICT.value());
            res.setMessage("No blank characters allowed");
            res.setStatus(httpStatus);
        }
        return new ResponseEntity<>(res,httpStatus);
    }

    @PostMapping("/sign-in")
    public ResponseEntity<AuthResponse> signIn(@RequestBody SignInRequest rq){
        AuthResponse res = new AuthResponse();
        if(!rq.getUsername().equals("") && !rq.getPassword().equals("")){
            String username = rq.getUsername();
            String password = rq.getPassword();
            Authentication authentication = authenticate(username,password);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String tokenSevenday = jwtTokenProvider.generateAccessToken(authentication);
            String tokenThirtyDay = jwtTokenProvider.generateRefreshToken(authentication);
            LocalDateTime currentTime = LocalDateTime.now();
            // Cộng thêm 7 ngày
            LocalDateTime expiredAccressToken = currentTime.plus(7, ChronoUnit.DAYS);
            LocalDateTime expiredRefreshToken = currentTime.plus(30, ChronoUnit.DAYS);
            // Chuyển LocalDateTime thành Timestamp
            Timestamp expiredAccressTokenTimestamp = Timestamp.valueOf(expiredAccressToken);
            Timestamp expiredRefreshTokenTimestamp = Timestamp.valueOf(expiredRefreshToken);
            // Create new user
            res.setStatus(true);
            res.setToken(tokenSevenday);
            User user = userService.findByUsername(username);
            user.setAccessToken(tokenThirtyDay);
            user.setRefreshToken(tokenThirtyDay);
            user.setExpiredAccessToken(expiredAccressTokenTimestamp);
            user.setExpiredRefresh(expiredRefreshTokenTimestamp);
            userService.signIn(user);
            System.err.println(authentication);
        }else{
            res.setStatus(false);
            res.setToken("No blank characters allowed");
        }

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        if (userDetails == null) {
            System.out.println("sign in userDetails - null " + userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            System.out.println("sign in userDetails - password not match " + userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
