package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.Review;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Long> {
}
