package com.andrei.licenta.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class BadCredentialsException extends RuntimeException {
	private static final long serialVersionUID = -8108436843245429288L;
	private String resourceName;
    private String fieldName;
    private Object fieldValue;

    public BadCredentialsException( String resourceName, String fieldName, Object fieldValue) {
        super(String.format("Wrong password for %s with %s : %s", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getFieldName() {
        return fieldName;
    }

    public Object getFieldValue() {
        return fieldValue;
    }
}