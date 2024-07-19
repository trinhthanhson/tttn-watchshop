package ptithcm.tttn.service.impl;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import ptithcm.tttn.config.JwtTokenProvider;
import ptithcm.tttn.entity.*;
import ptithcm.tttn.repository.*;
import ptithcm.tttn.request.SignUpRequest;
import ptithcm.tttn.service.EmailService;
import ptithcm.tttn.service.UserService;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service

public class UserServiceImpl implements UserService
{
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepo userRepo;
    private final StaffRepo staffRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;
    private final CustomerRepo customerRepo;
    private final CartRepo cartRepo;
    private final EmailService emailService;
    private  String otpAccept;
    public UserServiceImpl(JwtTokenProvider jwtTokenProvider, UserRepo userRepo, StaffRepo staffRepo, PasswordEncoder passwordEncoder, RoleRepo roleRepo, CustomerRepo customerRepo, CartRepo cartRepo, EmailService emailService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepo = userRepo;
        this.staffRepo = staffRepo;
        this.passwordEncoder = passwordEncoder;
        this.roleRepo = roleRepo;
        this.customerRepo = customerRepo;
        this.cartRepo = cartRepo;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public User createUser(SignUpRequest rq) throws Exception {
        if(otpAccept.equals(rq.getOtp())) {
            User user = new User();
            Role role = roleRepo.findByName(rq.getRole_name());
            user.setCreated_at(LocalDateTime.now());
            user.setStatus("Active");
            user.setUpdated_at(LocalDateTime.now());
            user.setPassword(passwordEncoder.encode(rq.getPassword()));
            user.setRole_id(role.getRole_id());
            user.setUsername(rq.getUsername());
            User saveUser = userRepo.save(user);
            if (saveUser != null) {
                if (role.getRole_name().equals("CUSTOMER")) {
                    Customer customer = new Customer();
                    customer.setCreated_at(LocalDateTime.now());
                    customer.setEmail(rq.getEmail());
                    customer.setUser_id(saveUser.getUser_id());
                    customer.setFirst_name(rq.getFirstname());
                    customer.setLast_name(rq.getLastname());
                    customer.setUpdated_at(LocalDateTime.now());
                    Customer saveCustomer = customerRepo.save(customer);

                    if (saveCustomer != null) {
                        Cart cart = new Cart();
                        cart.setCreated_at(LocalDateTime.now());
                        cart.setUpdated_at(LocalDateTime.now());
                        cart.setCustomer_id(saveCustomer.getCustomer_id());
                        cart.setTotal_price(0);
                        cart.setTotal_quantity(0);
                        Cart saveCart = cartRepo.save(cart);
                    }
                } else if (role.getRole_name().equals("STAFF")) {
                    Staff staff = new Staff();
                    staff.setUser_id(saveUser.getUser_id());
                    staff.setCreated_at(LocalDateTime.now());
                    staff.setEmail(rq.getEmail());
                    staff.setFirst_name(rq.getFirstname());
                    staff.setLast_name(rq.getLastname());
                    Staff saveStaff = staffRepo.save(staff);
                }
            }
            return saveUser;
        }else {
            throw new Exception("Create user fail" + otpAccept + ' ' + rq.getOtp() + ' ' + rq.getUsername());
        }
    }

    @Override
    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public User signIn(User user) {
        return userRepo.save(user);
    }

    @Override
    public User findUserByJwt(String jwt) throws Exception {
        String username = jwtTokenProvider.getUsernameFromJwtToken(jwt);
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new Exception("user not exist with username " + username);
        }
        return user;
    }

    @Override
    @Transactional
    public User updateStatus(Long id, String status, String jwt) throws Exception {
        User user = findUserByJwt(jwt);
        Staff staff = staffRepo.findByUserId(user.getUser_id());
        User update = findById(id);
        User save = new User();
        if(update != null && user.getRole().getRole_name().equals("MANAGER")){
            update.setStatus(status);
            update.setUpdated_by(staff.getStaff_id());
            save = userRepo.save(update);
        }else{
            throw new Exception("Can't update user of staff");
        }
        return user;
    }

    @Override
    public User findById(Long id) throws Exception {
        Optional<User> user = userRepo.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        throw new Exception("Not found User by id " + id);
    }

    @Override
    public String sendMail(String email, String username) {
        String otp = generateOTP();
        emailService.sentEmail(email, "Your registration verification code is", otp);
        otpAccept = otp;
        return otpAccept;
    }


    public static String generateOTP() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000); // Generate a random number between 100000 and 999999
        return String.valueOf(otp);
    }

}
