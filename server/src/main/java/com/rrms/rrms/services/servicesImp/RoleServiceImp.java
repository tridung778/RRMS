package com.rrms.rrms.services.servicesImp;

import com.rrms.rrms.models.Role;
import com.rrms.rrms.repositories.RoleRepository;
import com.rrms.rrms.services.IRoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class RoleServiceImp implements IRoleService {
    RoleRepository roleRepository;

    @Override
    public Optional<Role> findRoleByName(String name) {
        return roleRepository.findByRoleName(name);
    }
}
