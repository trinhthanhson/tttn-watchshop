package ptithcm.tttn.service;
import ptithcm.tttn.entity.User;
import ptithcm.tttn.request.SignUpRequest;

import javax.mail.MessagingException;

public interface UserService {
    User createUser(SignUpRequest rq) throws Exception;
    User updatePassword(String passWord,String email) throws Exception;
    User findByUsername(String username);
    User signIn(User user);
    User findUserByJwt(String jwt) throws Exception;
    User updateStatus(Long id, String status, String jwt) throws Exception;
    User findById(Long id) throws Exception;
    String sendMail(String email,String subject , String content, String otp) throws MessagingException;
}
