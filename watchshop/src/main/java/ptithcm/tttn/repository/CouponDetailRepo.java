package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.CouponDetail;

@Repository
public interface CouponDetailRepo extends JpaRepository<CouponDetail, Long> {
}
