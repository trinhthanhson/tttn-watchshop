package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.Customer;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
}
