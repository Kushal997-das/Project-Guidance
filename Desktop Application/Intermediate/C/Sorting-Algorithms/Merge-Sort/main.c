#include <stdio.h>


void merge( int a[], int lb, int mid, int ub ){

    int k=0, i=lb, j=mid+1 ;
    int b[ub-lb+1] ;

    while( i<=mid && j<=ub ){
        if( a[i] <= a[j] ){
            b[k] = a[i] ;
            ++i;
        }
        else if( a[i] > a[j] ){
            b[k] = a[j] ;
            j++ ;
        }
        k++ ;
    }

    while( i <= mid ){
        b[k] = a[i] ;
        i++ ;
        k++ ;
    }

    while( j<=ub ){
        b[k] = a[j] ;
        j++ ;
        k++ ;
    }
    for( int q=lb ; q<=ub ; q++ ){
        a[q] = b[q-lb] ;
    }
}

void merge_sort( int arr[], int lb, int ub ){
    if( lb < ub ){

        int mid = ( lb+ub ) / 2 ;
        merge_sort( arr , lb , mid ) ;
        merge_sort( arr , mid+1 , ub ) ;

        merge( arr , lb , mid , ub ) ;
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

    merge_sort(arr, 0, n-1) ;

    printf("\n\nAfter sorting : ") ;
    for(int i=0; i<n; i++){
        printf("%d",arr[i] );
        printf(" ") ;
    }
    return 0;
}
