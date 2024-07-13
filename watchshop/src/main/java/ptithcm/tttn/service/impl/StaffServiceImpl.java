package ptithcm.tttn.service.impl;

import org.springframework.stereotype.Service;
import ptithcm.tttn.entity.Staff;
import ptithcm.tttn.repository.StaffRepo;
import ptithcm.tttn.service.StaffService;

import java.sql.SQLException;

@Service
public class StaffServiceImpl implements StaffService {

    private final StaffRepo staffRepo;

    public StaffServiceImpl(StaffRepo staffRepo) {
        this.staffRepo = staffRepo;
    }

    @Override
    public Staff findByUserId(Long user_id) throws SQLException {
        try{
            return staffRepo.findByUserId(user_id);
        }
       catch (Exception e){
           throw new SQLException("Error finding staff by user ID: " + user_id, e);
       }
    }
}
