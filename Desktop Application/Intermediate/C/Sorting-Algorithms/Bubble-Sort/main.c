#include <stdio.h>

void swap(int *first, int *second ){
    int temp = *first ;
    *first = *second ;
    *second = temp ;
}

void bubble_sort( int arr[] , int n ){

    for( int i=0 ; i<n-1 ; i++){

        int swapped = 1 ;
        for( int j=0 ; j<n-i-1 ; j++){

            if( arr[j] > arr[j+1] ){
                swap( &arr[j] , &arr[j+1] ) ;
                swapped = 0 ;
            }
        }

        if( swapped )
            break ;
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

    bubble_sort(arr, n) ;

    printf("\n\nAfter sorting : ") ;
    for(int i=0; i<n; i++){
        printf("%d",arr[i] );
        printf(" ") ;
    }
    return 0;
}
