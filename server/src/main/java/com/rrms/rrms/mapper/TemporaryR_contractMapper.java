package com.rrms.rrms.mapper;

import org.mapstruct.Mapper;

import com.rrms.rrms.dto.request.TemporaryR_contractRequest;
import com.rrms.rrms.dto.response.TemporaryR_contractRespone;
import com.rrms.rrms.models.TemporaryR_contract;

@Mapper(componentModel = "spring")
public interface TemporaryR_contractMapper {
    TemporaryR_contractRespone TRCToTRCRespone(TemporaryR_contract TRC);

    TemporaryR_contract TRCRequestToTRC(TemporaryR_contractRequest TRCRequest);
}
