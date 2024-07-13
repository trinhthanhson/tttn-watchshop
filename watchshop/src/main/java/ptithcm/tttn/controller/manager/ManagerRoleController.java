package ptithcm.tttn.controller.manager;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ptithcm.tttn.entity.Role;
import ptithcm.tttn.repository.RoleRepo;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/manager/role")
public class ManagerRoleController {

    private final RoleRepo roleRepo;

    public ManagerRoleController(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @PostMapping("/add")
    public ResponseEntity<Role> addRoleByManager(@RequestBody Role r){
        Role role = new Role();
        if(!r.getRole_name().equals("")){
        role.setRole_name(r.getRole_name());
        role.setCreated_at(LocalDateTime.now());
        }
        return new ResponseEntity<>(roleRepo.save(role), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Role>> findAllRole(){
        return new ResponseEntity<>(roleRepo.findAll(),HttpStatus.OK);
    }
}
