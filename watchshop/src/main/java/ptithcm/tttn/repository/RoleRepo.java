package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {
}
