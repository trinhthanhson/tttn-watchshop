package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.PriceUpdateDetail;

@Repository
public interface PriceUpdateDetailRepo extends JpaRepository<PriceUpdateDetail, Long> {
}
