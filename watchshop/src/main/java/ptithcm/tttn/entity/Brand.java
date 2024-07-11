package ptithcm.tttn.entity;

import javax.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "brand")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long brand_id;

    @Column
    private String brand_name;

    @Column
    private LocalDateTime created_at;

    @Column
    private LocalDateTime updated_at;

    @Column
    private Long created_by;

    @Column
    private Long updated_by;

    @ManyToOne
    @JoinColumn(name = "created_by",insertable = false, updatable = false)
    private Staff created_brand;

    @ManyToOne
    @JoinColumn(name = "updated_by",insertable = false, updatable = false)
    private Staff updated_brand;

    @OneToMany(mappedBy = "brand")
    private List<Product> brands;



}
