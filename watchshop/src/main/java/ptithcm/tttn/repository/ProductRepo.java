package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.Product;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, String> {

    @Query(value = "SELECT * FROM product WHERE LOWER(product_name) = ?1  ", nativeQuery = true)
    Product findByName(String product_name);

    @Query("SELECT p FROM Product p WHERE " +
            "p.product_name LIKE %:searchTerm% OR " +
            "p.technology LIKE %:searchTerm% OR " +
            "p.glass LIKE %:searchTerm% OR " +
            "p.func LIKE %:searchTerm% OR " +
            "p.color LIKE %:searchTerm% OR " +
            "p.machine LIKE %:searchTerm% OR " +
            "p.sex LIKE %:searchTerm% OR " +
            "p.accuracy LIKE %:searchTerm% OR " +
            "p.battery_life LIKE %:searchTerm% OR " +
            "p.water_resistance LIKE %:searchTerm% OR " +
            "p.weight LIKE %:searchTerm% OR " +
            "p.other_features LIKE %:searchTerm%")
    List<Product> searchProducts(@Param("searchTerm") String searchTerm);

    @Query(value = "SELECT * FROM product WHERE category_id = ?1  ", nativeQuery = true)
    List<Product> findByCategoryId(Long category_id);

    @Query(value = "SELECT * FROM product WHERE brand_id = ?1  ", nativeQuery = true)
    List<Product> findByBrandId(Long brand_id);

}
