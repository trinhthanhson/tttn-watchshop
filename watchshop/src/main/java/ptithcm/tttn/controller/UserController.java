package ptithcm.tttn.controller;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ptithcm.tttn.entity.Customer;
import ptithcm.tttn.entity.Product;
import ptithcm.tttn.entity.Staff;
import ptithcm.tttn.entity.User;
import ptithcm.tttn.repository.ProductRepo;
import ptithcm.tttn.response.EntityResponse;
import ptithcm.tttn.service.CustomerService;
import ptithcm.tttn.service.EmailService;
import ptithcm.tttn.service.StaffService;
import ptithcm.tttn.service.UserService;

import javax.mail.MessagingException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final CustomerService customerService;
    private final StaffService staffService;

    public UserController(UserService userService, CustomerService customerService, StaffService staffService) {
        this.userService = userService;
        this.customerService = customerService;
        this.staffService = staffService;
    }

    @GetMapping("/find")
    public ResponseEntity<EntityResponse> findCustomerAndStaffProfileByJwt(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        EntityResponse res = new EntityResponse();
        try{
            if(user.getRole_id() == 3) {
                Customer customer = customerService.findByUserId(user.getUser_id());
                res.setData(customer);
                res.setMessage("find customer success");
                res.setStatus(HttpStatus.OK);
                res.setCode(HttpStatus.OK.value());
            }else if(user.getRole_id() == 2) {
                Staff staff = staffService.findByUserId(user.getUser_id());
                res.setData(staff);
                res.setMessage("find staff success");
                res.setStatus(HttpStatus.OK);
                res.setCode(HttpStatus.OK.value());
            }else {
                res.setData(null);
                res.setMessage("not found");
                res.setStatus(HttpStatus.OK);
                res.setCode(HttpStatus.OK.value());
            }
        }catch(Exception e){
            res.setData(null);
            res.setMessage("Error " + e.getMessage());
            res.setStatus(HttpStatus.CONFLICT);
            res.setCode(HttpStatus.CONFLICT.value());
        }

        return new ResponseEntity<>(res,res.getStatus());
    }



}
