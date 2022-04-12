package admin.example.covidfind;


import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.bumptech.glide.Glide;

import java.util.List;

public class MyCustomAdapter extends ArrayAdapter<CountryModel> {

    private Context context;
    private List<CountryModel> countryModelsList;
    private List<CountryModel> countryModelsListFiltered;

    public MyCustomAdapter( Context context, List<CountryModel> countryModelsList) {
        super(context, R.layout.vaccination_layout,countryModelsList);

        this.context = context;
        this.countryModelsList = countryModelsList;
        this.countryModelsListFiltered = countryModelsList;

    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.vaccination_layout,null,true);
        TextView string_name = view.findViewById(R.id.name);
        TextView string_address = view.findViewById(R.id.name_address);
        TextView string_pin = view.findViewById(R.id.pin_name);
        TextView string_dose_1 = view.findViewById(R.id.name_dose1);
        TextView string_dose_2 = view.findViewById(R.id.name_dose2);
        TextView string_total = view.findViewById(R.id.name_total);
        TextView string_fees = view.findViewById(R.id.fees_name);
        TextView string_state = view.findViewById(R.id.state_name);
        TextView string_district = view.findViewById(R.id.dist_name);
        TextView string_age_limit = view.findViewById(R.id.name_age);
        TextView string_vaccine = view.findViewById(R.id.name_vaccine);


        string_name.setText(countryModelsListFiltered.get(position).getName());
        string_address.setText(countryModelsListFiltered.get(position).getAddress());
        string_pin.setText(countryModelsListFiltered.get(position).getPincode());
        string_dose_1.setText("Dose 01: "+countryModelsListFiltered.get(position).getAvailable_capacity_dose1());
        string_dose_2.setText("Dose 02: "+countryModelsListFiltered.get(position).getAvailable_capacity_dose2());
        string_total.setText("Total: "+countryModelsListFiltered.get(position).getAvailable_capacity());
        string_fees.setText("Fees: "+countryModelsListFiltered.get(position).getFee());
        string_state.setText(countryModelsListFiltered.get(position).getState_name());
        string_district.setText(countryModelsListFiltered.get(position).getDistrict_name());
        string_age_limit.setText("Age Limit: "+countryModelsListFiltered.get(position).getMin_age_limit()+"+");
        string_vaccine.setText(countryModelsListFiltered.get(position).getVaccine());






        return view;
    }

    @Override
    public int getCount() {
        return countryModelsListFiltered.size();
    }

    @Nullable
    @Override
    public CountryModel getItem(int position) {
        return countryModelsListFiltered.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }


}