package ptithcm.tttn.entity;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "coupon_detail")
public class CouponDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long coupon_detail_id;

    @Column
    private String percent;

    @Column
    private String status;

    @Column
    private Long coupon_id;

    @Column
    private String product_id;

    @ManyToOne
    @JoinColumn(name = "coupon_id",insertable = false, updatable = false)
    private Coupon coupon;

    @ManyToOne
    @JoinColumn(name = "product_id",insertable = false, updatable = false)
    private Product product;

}
