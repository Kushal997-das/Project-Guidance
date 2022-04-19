#include <stdio.h>

void swap(int *first, int *second ){
    int temp = *first ;
    *first = *second ;
    *second = temp ;
}

void selection_sort( int arr[] , int n ){

    for(int i=0 ; i<n-1 ; i++){

        int min_ind = i ;
        for( int j=i+1 ; j<n ; j++){

            if( arr[j] < arr[min_ind] ){
                min_ind = j ;
            }
        }

        swap( &arr[i] , &arr[min_ind] ) ;
    }
}

int main() {

    int arr[] = {374, 42, 6, 920,825} ;
    int n = sizeof(arr)/sizeof(int) ;

    printf("Before sorting : ") ;
    for(int i=0; i<n; i++){
        printf("%d",arr[i] );
        printf(" ") ;
    }

    selection_sort(arr, n) ;

    printf("\n\nAfter sorting : ") ;
    for(int i=0; i<n; i++){
        printf("%d",arr[i] );
        printf(" ") ;
    }
    return 0;
}
