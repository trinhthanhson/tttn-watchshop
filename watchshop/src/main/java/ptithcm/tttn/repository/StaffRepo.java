package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.Staff;

@Repository
public interface StaffRepo extends JpaRepository<Staff, Long> {
}
