package ptithcm.tttn.controller.manager;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ptithcm.tttn.entity.Customer;
import ptithcm.tttn.entity.Staff;
import ptithcm.tttn.entity.User;
import ptithcm.tttn.response.ApiResponse;
import ptithcm.tttn.response.EntityResponse;
import ptithcm.tttn.response.ListEntityResponse;
import ptithcm.tttn.service.CustomerService;
import ptithcm.tttn.service.StaffService;
import ptithcm.tttn.service.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/manager/staff")
public class ManagerStaffController {

    private final UserService userService;
    private final StaffService staffService;

    public ManagerStaffController(UserService userService, StaffService staffService) {
        this.userService = userService;
        this.staffService = staffService;
    }

    @PutMapping("/{id}/update")
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

    @GetMapping("/all")
    public ResponseEntity<ListEntityResponse> getAllStaffByManager(@RequestHeader("Authorization") String jwt){
        ListEntityResponse res = new ListEntityResponse();
        try{
            List<User> listUser = userService.findAll();
            List<User> allUserStaff = new ArrayList<>();
            for(User u : listUser) {
                if(u.getRole_id() == 2L){
                    allUserStaff.add(u);
                }
            }
            res.setData(allUserStaff);
            res.setMessage("success");
            res.setCode(HttpStatus.OK.value());
            res.setStatus(HttpStatus.OK);
        }catch (Exception e){
            res.setData(null);
            res.setMessage("error " + e.getMessage());
            res.setCode(HttpStatus.CONFLICT.value());
            res.setStatus(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(res,res.getStatus());
    }

    @GetMapping("/{id}/find")
    public ResponseEntity<EntityResponse> getCustomerByStaff(@RequestHeader("Authorization") String jwt, @PathVariable Long id){
        EntityResponse res = new EntityResponse<>();
        try{
            Staff staff = staffService.findByUserId(id);
            res.setData(staff);
            res.setMessage("success");
            res.setCode(HttpStatus.OK.value());
            res.setStatus(HttpStatus.OK);
        }catch (Exception e){
            res.setData(null);
            res.setMessage("error " + e.getMessage());
            res.setCode(HttpStatus.CONFLICT.value());
            res.setStatus(HttpStatus.CONFLICT);
        }
        return new ResponseEntity<>(res,res.getStatus());
    }

}
