package ptithcm.tttn.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long staff_id;

    @Column
    private String username;

    @Column
    private String password;

    @Column
    private  String status;

    @Column
    private LocalDateTime created_at;

    @Column
    private  LocalDateTime updated_at;

    @Column
    private Long role_id;

    @ManyToOne
    @JoinColumn(name = "role_id",insertable = false, updatable = false)
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Staff> staffs;

    @OneToMany(mappedBy = "user")
    private List<Customer> customers;


}
