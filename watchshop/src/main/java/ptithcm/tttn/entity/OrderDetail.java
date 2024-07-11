package ptithcm.tttn.entity;

import javax.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "order_detail")
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private  Long order_detail_id;

    @Column
    private int quantity;

    @Column
    private int price;

    @Column
    private  Long order_id;

    @Column
    private String product_id;

    @ManyToOne
    @JoinColumn(name = "order_id",insertable = false, updatable = false)
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "product_id",insertable = false, updatable = false)
    private Product product;
}
