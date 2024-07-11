package ptithcm.tttn.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ptithcm.tttn.entity.*;
import ptithcm.tttn.repository.*;
import ptithcm.tttn.request.SignUpRequest;
import ptithcm.tttn.service.UserService;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service

public class UserServiceImpl implements UserService
{
    private final UserRepo userRepo;
    private final StaffRepo staffRepo;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepo roleRepo;
    private final CustomerRepo customerRepo;
    private final CartRepo cartRepo;

    public UserServiceImpl(UserRepo userRepo, StaffRepo staffRepo,PasswordEncoder passwordEncoder, RoleRepo roleRepo, CustomerRepo customerRepo, CartRepo cartRepo) {
        this.userRepo = userRepo;
        this.staffRepo = staffRepo;
        this.passwordEncoder = passwordEncoder;
        this.roleRepo = roleRepo;
        this.customerRepo = customerRepo;
        this.cartRepo = cartRepo;
    }

    @Override
    @Transactional
    public User createUser(SignUpRequest rq) {
        User user = new User();
        Role role = roleRepo.findByName(rq.getRole_name());

        user.setCreated_at(LocalDateTime.now());
        user.setStatus("Active");
        user.setUpdated_at(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(rq.getPassword()));
        user.setRole_id(role.getRole_id());
        user.setUsername(rq.getUsername());
        User saveUser = userRepo.save(user);
        if(saveUser != null ) {
            if (role.getRole_id() == 3) {
                Customer customer = new Customer();
                customer.setCreated_at(LocalDateTime.now());
                customer.setEmail(rq.getEmail());
                customer.setUser_id(saveUser.getUser_id());
                customer.setPhone(rq.getPhone());
                customer.setFirst_name(rq.getFirstname());
                customer.setLast_name(rq.getLastname());
                customer.setUpdated_at(LocalDateTime.now());
                Customer saveCustomer = customerRepo.save(customer);
                if (saveCustomer != null) {
                    Cart cart = new Cart();
                    cart.setCreated_at(LocalDateTime.now());
                    cart.setUpdated_at(LocalDateTime.now());
                    cart.setCustomer_id(saveCustomer.getCustomer_id());
                    cart.setTotal_price(0);
                    cart.setTotal_quantity(0);
                    Cart saveCart = cartRepo.save(cart);
                }
            } else if (role.getRole_id() == 2) {
                Staff staff = new Staff();
                staff.setUser_id(saveUser.getUser_id());
                staff.setCreated_at(LocalDateTime.now());
                staff.setEmail(rq.getEmail());
                staff.setFirst_name(rq.getFirstname());
                staff.setLast_name(rq.getLastname());
                staff.setPhone(rq.getPhone());
                Staff saveStaff = staffRepo.save(staff);
            }
        }
        return saveUser;

    }

    @Override
    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public User signIn(User user) {
        return userRepo.save(user);
    }

}
