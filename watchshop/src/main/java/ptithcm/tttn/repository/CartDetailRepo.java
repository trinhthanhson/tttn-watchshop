package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.CartDetail;

@Repository
public interface CartDetailRepo extends JpaRepository<CartDetail, Long> {
}
