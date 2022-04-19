#include <stdio.h>

void count_sort( int arr[], int n){

    int my_max = -100000, my_min = 100000, i ;

    for(i=0 ; i<n ; i++){

        if(arr[i] > my_max )my_max = arr[i] ;

        if( arr[i] < my_min )my_min = arr[i] ;
    }

    int k = my_max - my_min + 1 ;
    int count[k] , sorted[n] ;

    for(int i=0; i<k; i++){
        count[i] = 0 ;
    }

    for(i=0 ; i<n ; i++){
        count[arr[i] - my_min]++ ;
    }

    for(i=1 ; i<k ; i++){
        count[i] += count[i-1] ;
    }

    for(i=n-1 ; i>=0 ; i--){
    // start from end to maintain stability(last came in position last put in sorted array)
        --count[arr[i]-my_min] ;
        sorted[count[arr[i]-my_min]] = arr[i] ;

    }

    for(i=0 ; i<n ; i++)arr[i] = sorted[i] ;
}


int main() {

    int arr[] = {374, 42, 6, 920,825} ;
    int n = sizeof(arr)/sizeof(int) ;

    printf("Before sorting : ") ;
    for(int i=0; i<n; i++){
        printf("%d",arr[i] );
        printf(" ") ;
    }

    count_sort(arr, n) ;

    printf("\n\nAfter sorting : ") ;
    for(int i=0; i<n; i++){
        printf("%d",arr[i] );
        printf(" ") ;
    }
    return 0;
}
