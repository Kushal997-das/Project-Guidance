#include <stdio.h>

void swap(int *first, int *second ){
    int temp = *first ;
    *first = *second ;
    *second = temp ;
}


int partition( int arr[], int lb, int ub){

    int start=lb, end=ub, pivot=arr[lb] ;

    while(start < end){

        while(arr[start] <= pivot){
            start++ ;
        }
        while(arr[end] > pivot){
            end-- ;
        }

        if(start < end)swap(&arr[start], &arr[end]) ;
    }

    swap(&arr[lb], &arr[end]) ;

    return end ;
}

void quick_sort( int arr[], int lb, int ub){

    if( lb < ub ){
        int location = partition(arr, lb, ub) ;
        quick_sort(arr, lb, location-1) ;
        quick_sort(arr, location+1, ub) ;
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

    quick_sort(arr, 0, n-1) ;

    printf("\n\nAfter sorting : ") ;
    for(int i=0; i<n; i++){
        printf("%d",arr[i] );
        printf(" ") ;
    }
    return 0;
}
