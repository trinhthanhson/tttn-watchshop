package ptithcm.tttn.service.impl;

import org.springframework.stereotype.Service;
import ptithcm.tttn.entity.*;
import ptithcm.tttn.repository.PriceUpdateDetailRepo;
import ptithcm.tttn.repository.ProductRepo;
import ptithcm.tttn.repository.StaffRepo;
import ptithcm.tttn.request.ProductRequest;
import ptithcm.tttn.service.*;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    private final UserService userService;
    private final StaffService staffService;
    private final ProductRepo productRepo;
    private final BrandService brandService;
    private final CategoryService categoryService;
    private final PriceUpdateDetailRepo priceUpdateDetailRepo;

    public ProductServiceImpl(UserService userService, StaffService staffService, ProductRepo productRepo, BrandService brandService, CategoryService categoryService, PriceUpdateDetailRepo priceUpdateDetailRepo) {
        this.userService = userService;
        this.staffService = staffService;
        this.productRepo = productRepo;
        this.brandService = brandService;
        this.categoryService = categoryService;
        this.priceUpdateDetailRepo = priceUpdateDetailRepo;
    }

    @Override
    @Transactional
    public Product createProduct(ProductRequest product, String jwt) throws Exception {
        Product create = new Product();
        User user = userService.findUserByJwt(jwt);
        Staff staff = staffService.findByUserId(user.getUser_id());
        Brand brand = brandService.findByBrandName(product.getBrand_name());
        Category category = categoryService.findCategoryByName(product.getCategory_name());
        String id = generateNewProductId();
        create.setProduct_id(id);
        create.setCreated_at(LocalDateTime.now());
        create.setProduct_name(product.getProduct_name());
        create.setCreated_by(staff.getStaff_id());
        create.setBattery_life(product.getBattery_life());
        create.setAccuracy(product.getAccuracy());
        create.setBrand_id(brand.getBrand_id());
        create.setCategory_id(category.getCategory_id());
        create.setColor(product.getColor());
        create.setDetail(product.getDetail());
        create.setFunc(product.getFunc());
        create.setWeight(product.getWeight());
        create.setWater_resistance(product.getWater_resistance());
        create.setSex(product.getSex());
        create.setQuantity(product.getQuantity());
        create.setTechnology(product.getTechnology());
        create.setMachine(product.getMachine());
        create.setGlass(product.getGlass());
        create.setUpdated_at(LocalDateTime.now());
        create.setUpdated_by(staff.getStaff_id());
        Product save = productRepo.save(create);
        if(save != null){
            PriceUpdateDetail priceUpdateDetail = new PriceUpdateDetail();
            priceUpdateDetail.setCreated_at(LocalDateTime.now());
            priceUpdateDetail.setProduct_id(save.getProduct_id());
            priceUpdateDetail.setUpdated_at(LocalDateTime.now());
            priceUpdateDetail.setCreated_by(staff.getStaff_id());
            priceUpdateDetail.setPrice_new(product.getPrice());
            priceUpdateDetail.setPrice_old(product.getPrice());
            priceUpdateDetailRepo.save(priceUpdateDetail);
        }
    return save;
    }

    @Override
    public List<Product> findAll() {
        return productRepo.findAll();
    }

    @Override
    public Product findByName(String name) throws Exception {
        Product find = productRepo.findByName(name);
        if(find != null){
            return find;
        }
        throw new Exception("not found product by name " + name);
    }

    @Override
    public Product findById(String id) throws Exception {
        Optional<Product> find = productRepo.findById(id);
        if(find.isPresent()){
            return find.get();
        }
        throw new Exception("not found product by id " + id);

    }

    @Override
    public List<Product> findByDetail(String desc) {
        return productRepo.searchProducts(desc);
    }

    @Override
    public List<Product> findByCategoryId(Long id) {
        return productRepo.findByCategoryId(id);
    }

    @Override
    public List<Product> findByBrandId(Long id) {
        return productRepo.findByBrandId(id);
    }

    private String generateNewProductId() {

        List<Product> products = productRepo.findAll();
        int maxId = 0;
        for (Product p : products) {
            String idStr = p.getProduct_id().substring(2);  // Remove "DH" prefix
            int id = Integer.parseInt(idStr);
            if (id > maxId) {
                maxId = id;
            }
        }
        return String.format("DH%08d", maxId + 1);
    }
}
