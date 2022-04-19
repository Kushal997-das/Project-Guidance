#include <stdio.h>


void swap(int *first, int *second ){
    int temp = *first ;
    *first = *second ;
    *second = temp ;
}

void insertion_sort( int arr[] , int n){

    for( int i=1 ; i<n ; i++ ){

        int j = i ;
        while( j>0 && arr[j]<arr[j-1]){
            swap( &arr[j] , &arr[j-1] ) ;
            --j ;
        }
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

    insertion_sort(arr, n) ;

    printf("\n\nAfter sorting : ") ;
    for(int i=0; i<n; i++){
        printf("%d",arr[i] );
        printf(" ") ;
    }
    return 0;
}
