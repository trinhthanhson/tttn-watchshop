package ptithcm.tttn.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long order_id;

    @Column
    private String first_name;

    @Column
    private String last_name;

    @Column
    private int total_quantity;

    @Column
    private int total_price;

    @Column
    private String address;

    @Column
    private String note;

    @Column
    private String status;

    @Column
    private LocalDateTime created_at;

    @Column
    private LocalDateTime updated_at;

    @Column
    private Long created_by;

    @Column
    private Long updated_by;

    @OneToOne(mappedBy = "order")
    private Bill bill;

    @ManyToOne
    @JoinColumn(name = "created_by",insertable = false, updatable = false)
    private Customer customer_created;

    @ManyToOne
    @JoinColumn(name = "updated_by",insertable = false, updatable = false)
    private Customer customer_updated;

    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetails;



}
