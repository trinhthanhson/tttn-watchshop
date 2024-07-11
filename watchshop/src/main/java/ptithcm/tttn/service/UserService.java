package ptithcm.tttn.service;
import ptithcm.tttn.entity.User;
import ptithcm.tttn.request.SignUpRequest;

public interface UserService {
    User createUser(SignUpRequest rq);
    User findByUsername(String username);
    User signIn(User user);
}
