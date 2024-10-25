package com.rrms.rrms.dto.response;

import com.rrms.rrms.models.Permission;
import java.util.Set;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoleResponse {
  UUID roleId;
  String roleName;
  String roleDescription;
  Set<PermissionResponse> permissions;
}
