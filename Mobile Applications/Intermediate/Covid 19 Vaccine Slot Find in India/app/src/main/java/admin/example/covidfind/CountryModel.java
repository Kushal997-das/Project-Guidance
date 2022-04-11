package admin.example.covidfind;

public class CountryModel {
    private String name,address,state_name,district_name,pincode,available_capacity_dose1,available_capacity_dose2,available_capacity,fee,min_age_limit,vaccine;

    public CountryModel() {
    }

    public CountryModel(String name,String address,String state_name,String district_name,String pincode,String available_capacity_dose1,String available_capacity_dose2,String available_capacity,String fee,String min_age_limit,String vaccine) {
        this.name = name;
        this.address = address;
        this.state_name =state_name;
        this.district_name = district_name;
        this.pincode = pincode;
        this.available_capacity = available_capacity;
        this.available_capacity_dose1 = available_capacity_dose1;
        this.available_capacity_dose2 = available_capacity_dose2;
        this.fee = fee;
        this.min_age_limit = min_age_limit;
        this.vaccine = vaccine;

    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getState_name() {
        return state_name;
    }

    public void setState_name(String state_name) {
        this.state_name = state_name;
    }

    public String getDistrict_name() {
        return district_name;
    }

    public void setDistrict_name(String district_name) {
        this.district_name = district_name;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getAvailable_capacity_dose1() {
        return available_capacity_dose1;
    }

    public void setAvailable_capacity_dose1(String available_capacity_dose1) {
        this.available_capacity_dose1 = available_capacity_dose1;
    }

    public String getAvailable_capacity_dose2() {
        return available_capacity_dose2;
    }

    public void setAvailable_capacity_dose2(String available_capacity_dose2) {
        this.available_capacity_dose2 = available_capacity_dose2;
    }

    public String getAvailable_capacity() {
        return available_capacity;
    }

    public void setAvailable_capacity(String available_capacity) {
        this.available_capacity = available_capacity;
    }

    public String getFee() {
        return fee;
    }

    public void setFee(String fee) {
        this.fee = fee;
    }

    public String getMin_age_limit() {
        return min_age_limit;
    }

    public void setMin_age_limit(String min_age_limit) {
        this.min_age_limit = min_age_limit;
    }

    public String getVaccine() {
        return vaccine;
    }

    public void setVaccine(String vaccine) {
        this.vaccine = vaccine;
    }
}
