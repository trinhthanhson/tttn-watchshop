package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.Cart;

@Repository
public interface CartRepo extends JpaRepository<Cart,Long> {
}
