package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.Brand;

@Repository
public interface BrandRepo extends JpaRepository<Brand, Long> {
}
