package ptithcm.tttn.entity;

import javax.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long customer_id;

    @Column
    private String citizen_id;

    @Column
    private String first_name;

    @Column
    private String last_name;

    @Column
    private Date birthday;

    @Column
    private String gender;

    @Column
    private String tax_id;

    @Column
    private String email;

    @Column
    private String phone;

    @Column
    private LocalDateTime created_at;

    @Column
    private LocalDateTime updated_at;

    @Column
    private Long user_id;

    @OneToMany(mappedBy = "customer_created")
    private List<Orders> order_created;

    @OneToMany(mappedBy = "customer_updated")
    private List<Orders> order_updated;

    @OneToMany(mappedBy = "review_created")
    private List<Review> review_created;

    @OneToMany(mappedBy = "review_update")
    private List<Review> review_update;

    @ManyToOne
    @JoinColumn(name = "user_id",insertable = false, updatable = false)
    private User user;

    @OneToOne(mappedBy = "customer")
    private Cart cart;


}
