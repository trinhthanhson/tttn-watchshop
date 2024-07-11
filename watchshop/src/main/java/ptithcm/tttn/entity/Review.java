package ptithcm.tttn.entity;

import javax.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long review_id;

    @Column
    private float star;

    @Column
    private String content;

    @Column
    private LocalDateTime created_at;

    @Column
    private LocalDateTime updated_at;

    @Column
    private Long created_by;

    @Column
    private Long updated_by;

    @Column
    private String product_id;

    @ManyToOne
    @JoinColumn(name = "product_id",insertable = false, updatable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "created_by",insertable = false, updatable = false)
    private Customer review_created;

    @ManyToOne
    @JoinColumn(name = "updated_by",insertable = false, updatable = false)
    private Customer review_update;
}
