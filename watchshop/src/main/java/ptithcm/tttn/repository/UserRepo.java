package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
}
