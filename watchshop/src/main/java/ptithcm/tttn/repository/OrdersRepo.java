package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.Orders;

import java.util.List;

@Repository
public interface OrdersRepo extends JpaRepository<Orders, Long> {
    @Query(value = "SELECT * FROM orders WHERE created_by = ?1  ", nativeQuery = true)
    List<Orders> findByCustomerId(Long customer_id);
}
