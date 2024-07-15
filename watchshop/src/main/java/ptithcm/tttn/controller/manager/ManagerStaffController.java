package ptithcm.tttn.controller.manager;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ptithcm.tttn.entity.Customer;
import ptithcm.tttn.entity.User;
import ptithcm.tttn.response.ApiResponse;
import ptithcm.tttn.response.EntityResponse;
import ptithcm.tttn.service.StaffService;
import ptithcm.tttn.service.UserService;

@RestController("/manager/staff")
public class ManagerStaffController {

    private final UserService userService;

    public ManagerStaffController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/{id}/update")
    public ResponseEntity<ApiResponse> updateStatusStaff(@PathVariable Long id, @RequestHeader("Authorization") String jwt, @RequestBody User user) throws Exception {

        ApiResponse res = new ApiResponse();
        try{
            User update = userService.updateStatus(id, user.getStatus(),jwt);
            res.setCode(HttpStatus.OK.value());
            res.setStatus(HttpStatus.OK);
            res.setMessage("Success");
        }catch (Exception e){
            res.setCode(HttpStatus.CONFLICT.value());
            res.setStatus(HttpStatus.CONFLICT);
            res.setMessage("fail " + e.getMessage());
        }
    return new ResponseEntity<>(res,res.getStatus());
    }

}
