package ptithcm.tttn.service.impl;

import org.springframework.stereotype.Service;
import ptithcm.tttn.entity.Role;
import ptithcm.tttn.repository.RoleRepo;
import ptithcm.tttn.service.RoleService;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepo roleRepo;

    public RoleServiceImpl(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    public Role findById(Long id) throws Exception {
        Optional<Role> role = roleRepo.findById(id);
        if(role.isPresent()){
            return role.get();
        }
        throw new Exception("not found role wiht id " + id );
    }
}
