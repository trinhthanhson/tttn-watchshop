package ptithcm.tttn.service;

import ptithcm.tttn.entity.Role;

import java.util.Optional;

public interface RoleService {

    Role findById(Long role_id) throws Exception;
}
