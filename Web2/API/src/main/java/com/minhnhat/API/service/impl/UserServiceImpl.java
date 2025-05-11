package com.minhnhat.example05.service.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.minhnhat.example05.entity.Address;
import com.minhnhat.example05.entity.Cart;
import com.minhnhat.example05.entity.Role;
import com.minhnhat.example05.entity.User;
import com.minhnhat.example05.exceptions.APIException;
import com.minhnhat.example05.exceptions.ResourceNotFoundException;
import com.minhnhat.example05.payloads.AddressDTO;
import com.minhnhat.example05.payloads.CartDTO;
import com.minhnhat.example05.payloads.ProductDTO;
import com.minhnhat.example05.payloads.UserDTO;
import com.minhnhat.example05.payloads.UserResponse;
import com.minhnhat.example05.repository.AddressRepo;
import com.minhnhat.example05.repository.RoleRepo;
import com.minhnhat.example05.repository.UserRepo;
import com.minhnhat.example05.service.CartService;
import com.minhnhat.example05.service.UserService;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RoleRepo roleRepo;
    @Autowired
    private AddressRepo addressRepo;
    @Autowired
    private CartService cartService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public UserDTO registerUser(UserDTO userDTO) {
        try {
            // Chuyển UserDTO thành User entity
            User user = modelMapper.map(userDTO, User.class);

            // Tìm vai trò theo roleName
            Role role = roleRepo.findByRoleName(userDTO.getRoleName())
                    .orElseThrow(() -> new APIException("Role not found: " + userDTO.getRoleName()));
            user.getRoles().add(role);

            // Mã hóa mật khẩu
            user.setPassword(passwordEncoder.encode(user.getPassword()));

            // Lưu user vào database
            User registeredUser = userRepo.save(user);

            // Chuyển User entity thành UserDTO để trả về
            UserDTO registeredDTO = modelMapper.map(registeredUser, UserDTO.class);
            registeredDTO.setRoleName(userDTO.getRoleName()); // Gán lại roleName
            return registeredDTO;
        } catch (DataIntegrityViolationException e) {
            throw new APIException("User already exists with emailId: " + userDTO.getEmail());
        }
    }

    // Các phương thức khác giữ nguyên, nhưng cần kiểm tra (xem phần Lưu ý)
    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            userDTO.setRoleName(user.getRoles().stream().findFirst().get().getRoleName());
        }
        return userDTO;
    }

    @Override
    public UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sortByAndOrder = sortOrder.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();
        Pageable pageDetails = PageRequest.of(pageNumber, pageSize, sortByAndOrder);
        Page<User> pageUsers = userRepo.findAll(pageDetails);
        List<User> users = pageUsers.getContent();
        if (users.size() == 0) {
            throw new APIException("No User exists !!!");
        }
        List<UserDTO> userDTOS = users.stream().map(user -> {
            UserDTO dto = modelMapper.map(user, UserDTO.class);
            if (user.getRoles() != null && !user.getRoles().isEmpty()) {
                dto.setRoleName(user.getRoles().stream().findFirst().get().getRoleName());
            }
            return dto;
        }).collect(Collectors.toList());
        UserResponse userResponse = new UserResponse();
        userResponse.setContent(userDTOS);
        userResponse.setPageNumber(pageUsers.getNumber());
        userResponse.setPageSize(pageUsers.getSize());
        userResponse.setTotalElements(pageUsers.getTotalElements());
        userResponse.setTotalPages(pageUsers.getTotalPages());
        userResponse.setLastPage(pageUsers.isLast());
        return userResponse;
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            userDTO.setRoleName(user.getRoles().stream().findFirst().get().getRoleName());
        }
        return userDTO;
    }

    @Override
    public UserDTO updateUser(Long userId, UserDTO userDTO) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setMobileNumber(userDTO.getMobileNumber());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        if (userDTO.getRoleName() != null) {
            Role role = roleRepo.findByRoleName(userDTO.getRoleName())
                    .orElseThrow(() -> new APIException("Role not found: " + userDTO.getRoleName()));
            user.getRoles().clear();
            user.getRoles().add(role);
        }
        User updatedUser = userRepo.save(user);
        UserDTO updatedDTO = modelMapper.map(updatedUser, UserDTO.class);
        updatedDTO.setRoleName(userDTO.getRoleName());
        return updatedDTO;
    }

    @Override
    public String deleteUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
        userRepo.delete(user);
        return "User with userId " + userId + " deleted successfully!!!";
    }
}