package ptithcm.tttn.service;
import ptithcm.tttn.entity.User;
import ptithcm.tttn.request.SignUpRequest;

public interface UserService {
    User createUser(SignUpRequest rq);
    User findByUsername(String username);
    User signIn(User user);
    User findUserByJwt(String jwt) throws Exception;
    User updateStatus(Long id, String status, String jwt) throws Exception;
    User findById(Long id) throws Exception;
}
