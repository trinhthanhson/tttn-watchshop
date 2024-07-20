package ptithcm.tttn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ptithcm.tttn.entity.CartDetail;

import java.util.List;

@Repository
public interface CartDetailRepo extends JpaRepository<CartDetail, Long> {
    @Query("SELECT SUM(quantity*price) FROM CartDetail WHERE cart_id = ?1")
     int totalPriceByCartId(Long cart_id);
    @Query("SELECT SUM(quantity) FROM CartDetail WHERE cart_id = ?1")
     int totalQuantityByCartId(Long cart_id);
    @Query( value = "SELECT * FROM cart_detail WHERE cart_id = ?1",nativeQuery =  true)
     List<CartDetail> findCartDetailByCartId(Long cart_id);

    @Query( value = "SELECT * FROM cart_detail WHERE cart_id = ?1 AND product_id = ?2 ",nativeQuery =  true)
    CartDetail findCartDetailByProduct(Long cart_id,String product_id);
}
