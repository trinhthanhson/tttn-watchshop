package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
}
