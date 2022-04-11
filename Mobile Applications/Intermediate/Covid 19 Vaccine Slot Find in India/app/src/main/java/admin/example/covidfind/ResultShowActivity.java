package admin.example.covidfind;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.RecyclerView;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.view.View;
import android.widget.ListView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class ResultShowActivity extends AppCompatActivity {

    private RecyclerView recyclerView;

    ListView listView;
    String date,pin;
    private ProgressDialog progressDialog;


    public static List<CountryModel> countryModelsList = new ArrayList<>();
    CountryModel countryModel;
    MyCustomAdapter myCustomAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_result_show);

        Bundle bundle = getIntent().getExtras();
        date = bundle.getString("DATE");
        pin = bundle.getString("PIN");

        progressDialog = new ProgressDialog(ResultShowActivity.this);
        progressDialog.setContentView ( R.layout.loading );
        progressDialog.setTitle ( "Please Wait..." );
        progressDialog.setCanceledOnTouchOutside ( false );
        progressDialog.setMessage ( "Tips: Please Check your Internet or Wi-fi Connection" );



        listView = findViewById(R.id.recycler_view);

        fetchData();





    }

    private void fetchData() {

        String url  = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+pin+"&date="+date;

        progressDialog.show();


        StringRequest request = new StringRequest(Request.Method.GET, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {




                        try {


                            JSONObject js = new JSONObject(response);
                            String stringy = js.getString("sessions");


                            JSONArray jsonArray = new JSONArray(stringy);

                            for(int i=0;i<jsonArray.length();i++){

                                JSONObject jsonObject = jsonArray.getJSONObject(i);

                                String name = jsonObject.getString("name");
                                String address = jsonObject.getString("address");
                                String state_name = jsonObject.getString("state_name");
                                String district_name = jsonObject.getString("district_name");
                                String pincode = jsonObject.getString("pincode");
                                String available_capacity_dose1 = jsonObject.getString("available_capacity_dose1");
                                String available_capacity_dose2 = jsonObject.getString("available_capacity_dose2");
                                String available_capacity = jsonObject.getString("available_capacity");
                                String fee = jsonObject.getString("fee");
                                String min_age_limit = jsonObject.getString("min_age_limit");
                                String vaccine = jsonObject.getString("vaccine");



                                countryModel = new CountryModel(name,address,state_name,district_name,pincode,available_capacity_dose1,available_capacity_dose2,available_capacity,fee,min_age_limit,vaccine);
                                countryModelsList.add(countryModel);


                            }

                           
                            if (stringy.equals("[]")){
                                Toast.makeText(ResultShowActivity.this, "There is No Vaccination ! Sorry", Toast.LENGTH_SHORT).show();
                                //Here You can add any function you want , i only add here a Toast Message Only.
                                progressDialog.dismiss();
                            }

                            else {
                                myCustomAdapter = new MyCustomAdapter(ResultShowActivity.this,countryModelsList);
                                listView.setAdapter(myCustomAdapter);
                                progressDialog.dismiss();
                            }







                        } catch (JSONException e) {
                            e.printStackTrace();
                            progressDialog.dismiss();
                        }


                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                progressDialog.dismiss();
                Toast.makeText(ResultShowActivity.this, error.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });

        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(request);



    }
}
