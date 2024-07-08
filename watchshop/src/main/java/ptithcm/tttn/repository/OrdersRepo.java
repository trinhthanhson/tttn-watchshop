package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.Orders;

@Repository
public interface OrdersRepo extends JpaRepository<Orders, Long> {
}
