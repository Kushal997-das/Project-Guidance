#include <stdio.h>

#include <pcap.h>
#include <arpa/inet.h>
#include <string.h>
#include <time.h>
#include <netinet/in.h>
#include <netinet/if_ether.h>
#include <netinet/ip.h>
#include <netinet/ip6.h>
#include <netinet/tcp.h>
#include <netinet/udp.h>

#include <stdint.h>
#include <ifaddrs.h>
#include <linux/if.h>
#include <stdlib.h>


#define check_packet_ptr(PKT, DATA, LEN) ((PKT) >= ((DATA) + (LEN)))


void my_packet_handler(
    u_char *args,
    const struct pcap_pkthdr *header,
    const u_char *packet
);
struct dispkt packet_parser(struct pcap_pkthdr packet_header, const u_char *packet_body);
int print_packet_description(struct dispkt *dpkt, struct pcap_pkthdr hdr);
const char* find_dns_type(int code);


int link_type;
int packet_counter;

//Parser data
struct dispkt {
    union { /**< Source address */
        struct in6_addr ip6;
        uint32_t        ip;
    } sa;

    union { /**< Destination address */
        struct in6_addr ip6;
        uint32_t        ip;
    } da;

    uint16_t sp;           /**< Source port */
    uint16_t dp;           /**< Destination port */
    int      family;       /**< Address family */
    uint8_t  ip_proto;     /**< IP protocol */
    size_t payload_offset; /**< Payload offset within the packet */
    const u_char *payload; /**< Packet payload */
};

//Printer data set
struct dnshdr {
    uint16_t id;
    uint16_t flags;
    uint16_t qdcount;
    uint16_t ancount;
    uint16_t nscount;
    uint16_t arcount;
} __attribute__((packed));

//Payload analyzer result
struct payload_data {
   u_char *name;
  const u_char *type;
  const u_char *class;
  uint32_t ttl;
  const u_char *data;
  u_char* tmp;
};


/**
 * Basic DNS record types (RFC 1035)
 */
static const char *dns_types[] = {
    "UNKN",  /* Unsupported / Invalid type */
    "A",     /* Host Address */
    "NS",    /* Authorative Name Server */
    "MD",    /* Mail Destination (Obsolete) */
    "MF",    /* Mail Forwarder   (Obsolete) */
    "CNAME", /* Canonical Name */
    "SOA",   /* Start of Authority */
    "MB",    /* Mailbox (Experimental) */
    "MG",    /* Mail Group Member (Experimental) */
    "MR",    /* Mail Rename (Experimental) */
    "NULL",  /* Null Resource Record (Experimental) */
    "WKS",   /* Well Known Service */
    "PTR",   /* Domain Name Pointer */
    "HINFO", /* Host Information */
    "MINFO", /* Mailbox / Mail List Information */
    "MX",    /* Mail Exchange */
    "TXT",   /* Text Strings */
    "UNKN",
    "UNKN",
    "UNKN",
    "UNKN",
    "UNKN",
    "UNKN",
    "UNKN",
    "UNKN",
    "UNKN",
    "UNKN",
    "UNKN",
    "AAAA",   /* IPv6 Host Address (RFC 1886) */
    "LOC",
    "UNKN",
    "UNKN",
    "UNKN",
    "SRV"
};

const char* find_dns_type(int code){
  if(code<34){
    return dns_types[code];
  }else if( code>251 & code<256){
    if(code ==252) return "AXFR";
    if(code ==253) return "MAILB";
    if(code ==254) return "MAILA";
    if(code ==255) return "*";
  }else{
    return "UNKN";
  }
}

static const char *dns_class[] = {
    "UNKN",  /* Unsupported / Invalid type */
    "IN",
    "CS",
    "CH",
    "HS"
};

const char* find_dns_class(int code){
  if(code<5){
    return dns_class[code];
  }else if( code==255){
    return "*";
  }else{
    return "UNKN";
  }
}


static u_char buf[BUFSIZ]; /* Label buffer */
static char dbuf[BUFSIZ];  /* Data bufffer */
FILE *f;



//This program is able to parse a PCAP file and provide in output a json file containing DNS packet informations.

int main(int argc, char **argv) {
    char* pcap_file_name = "dns.cap";
    char* output_file_name = "output.txt";

    pcap_t *handle;
    char error_buffer[PCAP_ERRBUF_SIZE];

    struct bpf_program filter;
    char *filter_desc =
      "port 53 and ("
      "(udp)or"
      "(tcp)"
      ")";

      printf("argc: %d\n",argc );

    if(argc !=3){
      return 1;
    }


    printf("Packet capture file location: %s\n",argv[1] );
    printf("Output file location: %s\n",argv[2] );
    pcap_file_name = argv[1];
    output_file_name = argv[2];



      /* Open device for live capture */
      handle = pcap_open_offline(pcap_file_name, error_buffer);
      if (handle == NULL) {
           fprintf(stderr, "I can´t not open the file.\n");
           return 2;
       }


      link_type = pcap_datalink(handle);
      if (link_type != DLT_LINUX_SLL && link_type != DLT_EN10MB &&
        link_type != DLT_IPV4 && link_type != DLT_IPV6) {
        fprintf(stderr, "Unsupported link type: %d\n", link_type);
        return 2;
      }

      //Packet filtering keep only DNS
      if(pcap_compile(handle, &filter, filter_desc, 0, 0) == -1  || pcap_setfilter(handle, &filter)==-1){
        fprintf(stderr, "Bad filter - %s\n", pcap_geterr(handle));
        return 2;
      }


      f = fopen (output_file_name,"w");
      fprintf(f, "{\n");

      packet_counter = 0;
      pcap_loop(handle, 0, my_packet_handler, NULL);

      fprintf(f, "\n}");
      fclose(f);


    return 0;
}

void my_packet_handler(
    u_char *args,
    const struct pcap_pkthdr *packet_header,
    const u_char *packet_body
)
{
    packet_counter++;

    //PARSING LIMITATOR TEST
   //if(packet_counter>4){
    //return;
    //}

    //Packet error expolit
    if(!packet_header || !packet_body){
      goto err;
    }
    if(packet_header->caplen > packet_header->len){
      goto err;
    }

    //Packet parsing
    struct dispkt packet_description = packet_parser(*packet_header, packet_body);

    print_packet_description(&packet_description, *packet_header);
    return;

err:
      printf("There is an error with the packet %d\n", packet_counter);
}

// DATA PARSING
struct dispkt packet_parser(struct pcap_pkthdr packet_header, const u_char *packet_body){
  struct dispkt dpkt;

  const u_char *pkt = packet_body;
  uint16_t protocol = 0;

  /* Get the protocol identifier from the link layer */
  switch (link_type) {
      case DLT_LINUX_SLL: /* sockaddr_ll "cooked" packet */
          protocol = ntohs(*(uint16_t *)(pkt + 14));
          pkt += 16;
      break;
      case DLT_EN10MB: /* Ethernet */
          protocol = ntohs(*(uint16_t *)(pkt + ETH_HLEN - 2));
          pkt += ETH_HLEN;
      break;
      case DLT_IPV4: /* Raw IPv4 */
          protocol = ETH_P_IP;
      break;
      case DLT_IPV6: /* Raw IPv6 */
          protocol = ETH_P_IPV6;
      break;
  }

  if (check_packet_ptr(pkt, packet_body, packet_header.len) || !protocol)
      goto err;

/* Get the IP protocol used, and seek past the IP header. */
  switch (protocol) {
      case ETH_P_IP:
          protocol = ((struct iphdr *)pkt)->protocol;
          dpkt.sa.ip  = ((struct iphdr *)pkt)->saddr;
          dpkt.da.ip  = ((struct iphdr *)pkt)->daddr;
          dpkt.family = AF_INET;
          pkt = pkt + (((struct iphdr *)pkt)->ihl << 2);
      break;
      case ETH_P_IPV6:
          dpkt.sa.ip6 = ((struct ip6_hdr *)pkt)->ip6_src;
          dpkt.da.ip6 = ((struct ip6_hdr *)pkt)->ip6_dst;
          dpkt.family = AF_INET6;
          protocol = ((struct ip6_hdr *)pkt)->ip6_nxt;
          pkt += 40; /* IPv6 header langth */
      break;
      default:
          protocol = 0;
  }

  if (check_packet_ptr(pkt,  packet_body, packet_header.len) || !protocol)
      goto err;


/* Now handle the TCP/UDP layer */
  dpkt.ip_proto = protocol & 0xff;
  switch (dpkt.ip_proto) {
      case IPPROTO_UDP:
          dpkt.sp = ntohs(((struct udphdr *)pkt)->source);
          dpkt.dp = ntohs(((struct udphdr *)pkt)->dest);
          pkt += 8;
      break;
      case IPPROTO_TCP:
          dpkt.sp = ntohs(((struct tcphdr *)pkt)->source);
          dpkt.dp = ntohs(((struct tcphdr *)pkt)->dest);
          pkt += (((struct tcphdr *)pkt)->doff << 2) + 1;
      break;
      default:
          protocol = 0;
  }

  if (check_packet_ptr(pkt, packet_body, packet_header.len) || !protocol)
      goto err;

  dpkt.payload = pkt;
  dpkt.payload_offset = pkt - packet_body;


  return dpkt;

err:
  printf("There is an error with the packet num: %d\n", packet_counter);
  return dpkt;

}



// DATA PRINTING
/**
 * Skip a DNS label.
 *
 * \param[in] label Pointer to the label
 * \return Pointer to the byte following the label
 */
static u_char *skip_dns_label(u_char *label)
{
    u_char *tmp;

    if (!label) return NULL;
    if (*label & 0xc0)
        return label + 2;

    tmp = label;
    while (*label) {
        tmp += *label + 1;
        label = tmp;
    }
    return label + 1;
}
#include <ctype.h>

int checkString(char str1[]){
  int i, x=0, p;
  p=strlen(str1);

  for(i=0; i<p; i++){
    if(isalnum(str1[i]) || (str1[i]=='.') || (str1[i]=='-')){
      continue;
    }else{
      return 0;
    }
  }
  return 1;
}
/**
 * Convert a DNS label (which may contain pointers) to
 * a string by way of the given destination buffer.
 *
 * \param[in] label     Pointer to the start of the label
 * \param[in] dest      Destination buffer
 * \param[in] dest_size Destination buffer size
 * \param[in] payload   Start of the packet
 * \param[in] end       End of the packet
 * \return dest
 */
  u_char *dns_label_to_str(u_char **label, u_char *dest,
                               size_t dest_size,
                               const u_char *payload,
                               const u_char *end)
{
    u_char *tmp, *dst = dest;

    if (!label || !*label || !dest)
        goto err;

    *dest = '\0';
    while (*label < end && **label) {
        if (**label & 0xc0) { /* Pointer */
            tmp = (u_char *)payload;
            tmp += ntohs(*(uint16_t *)(*label)) & 0x3fff;
            while (tmp < end && *tmp) {
                if (dst + *tmp >= dest + dest_size)
                    goto err;
                memcpy(dst, tmp+1, *tmp);
                dst += *tmp; tmp += *tmp + 1;
                if (dst > dest + dest_size) goto err;
                *dst = '.'; dst++;
            };
            *label += 2;
        } else { /* Label */
          //printf("its a label: %x\n", ntohs(*(uint32_t *)tmp));

            if ((*label + **label) >= end)
                goto err;
            if (**label + dst >= dest + dest_size)
                goto err;
            memcpy(dst, *label + 1, **label);
            dst += **label;
            if (dst > dest + dest_size) goto err;
            *label += **label + 1;
            *dst = '.'; dst++;
        }
    }

    *(--dst) = '\0';
    return dest;
err:
    if (dest) *dest = '\0';
    return dest;
}

void intToStringIP(int ip, char * string_ip){
  char string_value[25];
  unsigned char bytes[4];
  bytes[0] = ip & 0xFF;
  bytes[1] = (ip >> 8) & 0xFF;
  bytes[2] = (ip >> 16) & 0xFF;
  bytes[3] = (ip >> 24) & 0xFF;
  sprintf(string_value,"%d.%d.%d.%d", bytes[0], bytes[1], bytes[2], bytes[3]);

  memcpy(string_ip,string_value, sizeof(string_value));
}
char *int2bin(uint16_t n) {
    // determine the number of bits needed ("sizeof" returns bytes)
    int nbits = sizeof(n) * 8;
    char *s = malloc(nbits+1);  // +1 for '\0' terminator
    s[nbits] = '\0';
    // forcing evaluation as an unsigned value prevents complications
    // with negative numbers at the left-most bit
    unsigned int u = *(unsigned int*)&n;
    int i;
    unsigned int mask = 1 << (nbits-1); // fill in values right-to-left
    for (i = 0; i < nbits; i++, mask >>= 1)
        s[i] = ((u & mask) != 0) + '0';
    return s;
}
char* binaryToString(char code){
  if(code == '0')
  {
    return "false";
  }else{
    return "true";
  }
}

char* opCodeToString(char code1, char code2, char code3, char code4){
  if(code1 == '0' && code2 == '0' && code3 == '0' && code4 == '0')
  {
    return "QUERY";
  }else if(code1 == '0' && code2 == '0' && code3 == '0' && code4 == '1'){
    return "IQUERY";
  }else if(code1 == '0' && code2 == '0' && code3 == '1' && code4 == '0'){
    return "STATUS";
  }else{
    return "RESERVED";
  }
}

char* rCodeToString(char code1, char code2, char code3, char code4){
  if(code1 == '0' && code2 == '0' && code3 == '0' && code4 == '0')
  {
    return "NOERROR";
  }else if(code1 == '0' && code2 == '0' && code3 == '0' && code4 == '1'){
    return "FERROR";
  }else if(code1 == '0' && code2 == '0' && code3 == '1' && code4 == '0'){
    return "SFAILURE";
  }else if(code1 == '0' && code2 == '0' && code3 == '1' && code4 == '1'){
    return "NERROR";
  }else if(code1 == '0' && code2 == '1' && code3 == '0' && code4 == '0'){
    return "NIMPLEMENTED";
  }else if(code1 == '0' && code2 == '1' && code3 == '0' && code4 == '1'){
    return "REFUSED";
  }else{
    return "RESERVED";
  }
}




struct payload_data  payoadAnalyzer (u_char* tmp, const u_char *end, struct dispkt *dpkt){

  const char *data;
  uint16_t len;
  int i;

  struct payload_data payload;


  //tmp = skip_dns_label(tmp);

  payload.name = dns_label_to_str(&tmp, buf, BUFSIZ, dpkt->payload, end);


  //payload.label = (char *)dns_label_to_str( &tmp, (u_char *)dbuf, BUFSIZ, dpkt->payload, tmp + len);

  //printf("Im payload label: %s\n",payload.name);

  if (tmp + 10 > end) return payload;

  /* Get the type, and skip class and ttl */
  len = ntohs(*(uint16_t *)tmp);
  //tmp += 8;
  tmp += 2;
  int atype = len;
  int aclass = ntohs(*(uint16_t *)tmp);
  tmp += 2;
  int attl1 = ntohs(*(uint32_t *)tmp);
  tmp += 2;
  int attl2 = ntohs(*(uint32_t *)tmp);
  tmp += 2;

  payload.ttl = attl1*65536 + attl2;


  int atxt_lenght=0;

  /* Get the data field length */
  len = ntohs(*(uint16_t *)tmp); tmp += 2;
  if (atype == 28) atype = 17; /* 28 = AAAA */
  else if (atype > 16) atype = 0;

  char *backupTMP = tmp;

  /* Now, handle the data based on type */
  switch (atype) {
      case 1: /* A */
          data = inet_ntop(AF_INET, tmp, dbuf, BUFSIZ);
          tmp = tmp + len;
      break;
      case 2:  /* NS */
      case 5:  /* CNAME */
      case 12: /* PTR */
      //printf("data1: %x\n", ntohs(*(uint32_t *)tmp));
          data = (char *)dns_label_to_str(
              &tmp, (u_char *)dbuf, BUFSIZ,
              dpkt->payload, tmp + len
          );
      tmp = backupTMP+len;
      //printf("data2: %x\n", ntohs(*(uint32_t *)tmp));

      break;
      case 10: /* NULL */
          data = "NULL";
      break;
      case 15: /* MX (16-bit priority / label) */

          i = snprintf(dbuf, 7, "%u ", ntohs(*(uint16_t *)tmp));
          tmp += 2;
          data = (char *)dns_label_to_str(
              &tmp, (u_char *)(dbuf), BUFSIZ,
              dpkt->payload, tmp + len - 2
          );
          data = dbuf;
      break;
      case 16: /* TXT (1 byte text length / text) */
          if (tmp + len <= end) {
              atxt_lenght = *tmp;
              printf("This is txt and the lenght is %d\n", atxt_lenght);
              memcpy(dbuf, tmp+1, *tmp);
              dbuf[*tmp+1] = '\0';
          } else *dbuf = '\0';
          data = dbuf;
          tmp = tmp +len;
      break;
      case 17: /* AAAA */
          data = inet_ntop(AF_INET6, tmp, dbuf, BUFSIZ);
          tmp= tmp+len;
      break;
      default:
          /* Ignore unhandled RR types */
          *dbuf = '\0';
          data = dbuf;
  }

  payload.tmp = tmp;
  payload.type = find_dns_type(atype);
  payload.class = find_dns_class(aclass);
  payload.data = data;

  return payload;
}


char* concat(const char *s1, const char *s2){
    char * result = malloc (strlen(s1)+strlen(s1)+1);
    strcpy(result, s1);
    strcat(result, s2);
    return result;
}

int print_packet_description(struct dispkt *dpkt, struct pcap_pkthdr hdr) {

      struct dnshdr *dnsh;
      u_char *tmp;
      u_char *label;
      const char *data;
      const u_char *end;
      uint16_t len, qtype = 0, qclass=0;
      int i;

      char buffer[1024];
      char* fileOutput = "";




        //Parsing the head
        end = dpkt->payload + (hdr.len - dpkt->payload_offset);
        if (end < dpkt->payload){
          printf("Packet : %d failed to print - not valid\n",packet_counter);
          goto failParse;
        }

        dnsh = (struct dnshdr *)(dpkt->payload);
        dnsh->id      = ntohs(dnsh->id);
        dnsh->flags   = ntohs(dnsh->flags);
        dnsh->qdcount = ntohs(dnsh->qdcount);
        dnsh->ancount = ntohs(dnsh->ancount);
        dnsh->nscount = ntohs(dnsh->nscount);
        dnsh->arcount = ntohs(dnsh->arcount);

        if (!dnsh->qdcount || dnsh->qdcount <1 || dnsh->ancount <0 || dnsh->nscount <0 || dnsh->arcount <0 ){
          printf("Packet : %d failed to print - malformed\n",packet_counter);
          goto failParse;
        }

        fileOutput = (char *) malloc(1);
        strcpy(fileOutput,"");


        printf("\nPacket number: %d\n", packet_counter);
        if(packet_counter==1){
          snprintf(buffer, sizeof(buffer), "\"packet_%d\": {\n",packet_counter);
        }else{
          snprintf(buffer, sizeof(buffer), ",\n\"packet_%d\": {\n",packet_counter);
        }
        fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);


        char source_ip[25], destination_ip[25];
        intToStringIP(dpkt->sa.ip, source_ip);
        intToStringIP(dpkt->da.ip, destination_ip);
        printf("source ip: %s port: %d destination ip: %s port: %d\n", source_ip, dpkt->sp, destination_ip,dpkt->dp);
        snprintf(buffer, sizeof(buffer), " \"ipv4\": {\n  \"scrip\": \"%s\",\n  \"scrport\": %d,\n  \"dstip\": \"%s\",\n  \"dstport\": %d\n },\n",  source_ip, dpkt->sp, destination_ip,dpkt->dp);
        fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);

        printf("id: %d\n",dnsh->id);
        char* flag_array = int2bin(dnsh->flags);
        //printf("flag printout %s\n",flag_array);
        if(strcmp(binaryToString(flag_array[0]),"true")==0 && dnsh->ancount ==0 && dnsh->arcount ==0 ) goto failParse;
        printf("flags qr: %s opcode: %s aa: %s ad: %s tc: %s rd: %s ra: %s cd: %s rcode: %s \n",binaryToString(flag_array[0]), opCodeToString(flag_array[1],flag_array[2],flag_array[3],flag_array[4]),
        binaryToString(flag_array[5]),binaryToString(flag_array[10]), binaryToString(flag_array[6]), binaryToString(flag_array[7]), binaryToString(flag_array[8]), binaryToString(flag_array[11]),
        rCodeToString(flag_array[12],flag_array[13],flag_array[14],flag_array[15]));
        printf("qdcount: %d ancount: %d nscount: %d arcount: %d\n", dnsh->qdcount, dnsh->ancount, dnsh->nscount, dnsh->arcount);
        snprintf(buffer, sizeof(buffer)," \"header\": {\n  \"id\": %d,\n  \"qr\": %s,\n  \"opcode\": \"%s\",\n  \"aa\": %s,\n  \"ad\": %s,\n  \"tc\": %s,\n  \"rd\": %s,\n  \"ra\": %s,\n  \"cd\": %s,\n  \"rcode\": \"%s\",\n  \"qdcount\": %d,\n  \"nscout\": %d,\n  \"ancount\": %d,\n  \"arcount\": %d\n },\n",
        dnsh->id, binaryToString(flag_array[0]), opCodeToString(flag_array[1],flag_array[2],flag_array[3],flag_array[4]),   binaryToString(flag_array[5]),binaryToString(flag_array[10]), binaryToString(flag_array[6]), binaryToString(flag_array[7]), binaryToString(flag_array[8]), binaryToString(flag_array[11]),
          rCodeToString(flag_array[12],flag_array[13],flag_array[14],flag_array[15]), dnsh->qdcount, dnsh->nscount, dnsh->ancount, dnsh->arcount );
        fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);



        snprintf(buffer, sizeof(buffer), " \"question\": [\n");
        fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);

        /* Output the Question */
        tmp = (u_char *)(dpkt->payload + 12);
        for (i=0;i<dnsh->qdcount;i++) {

            //if (!qtype) {
                label = dns_label_to_str(&tmp, buf, BUFSIZ, dpkt->payload, end);
                tmp++;
                qtype = ntohs(*(uint16_t *)tmp);
            //} else {
              //  if (*tmp & 0xc0) tmp += 2;
              //  else tmp = skip_dns_label(tmp);
            //}

            tmp++; tmp++;
            qclass  = ntohs(*(uint16_t *)tmp);
            tmp++; tmp++;
            printf("Queston name: %s type: %s class: %s \n", label, find_dns_type(qtype), find_dns_class(qclass));
            if(i==0){
              snprintf(buffer, sizeof(buffer), "  {\n   \"qname\": \"%s\",\n   \"qtype\": \"%s\",\n   \"qclass\": \"%s\"\n  }",  label, find_dns_type(qtype), find_dns_class(qclass));
            }else{
              snprintf(buffer, sizeof(buffer), ",\n  {\n   \"qname\": \"%s\",\n   \"qtype\": \"%s\",\n   \"qclass\": \"%s\"\n  }",  label, find_dns_type(qtype), find_dns_class(qclass));
            }
            fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);

            //If this is the end there are no answer
            if (tmp >= end) {
              if(dnsh->ancount == 0 && dnsh->nscount == 0 && dnsh->arcount == 0){
                snprintf(buffer, sizeof(buffer), "\n ],\n \"answer\": [\n\n ],\n \"authority\": [\n\n ],\n \"additional\": [\n\n ]\n");
                fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
                goto ret;
              }else{
                printf("Packet : %d failed to print - information missing\n",packet_counter);
                goto failParse;
              }
            }
        }
        if (!qtype) goto failParse;
        snprintf(buffer, sizeof(buffer), "\n ],\n");
        fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);





      /* Output the Answer */
        //char dataAnswer[200][200];// TO DO: MAKE I DYNAMIC
        if(dnsh->ancount !=0){
          //if(dnsh->nscount !=0) goto failParse;
          snprintf(buffer, sizeof(buffer), " \"answer\": [\n");
          fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
          for (int ansI=0;ansI<dnsh->ancount;ansI++) {
              struct payload_data payload = payoadAnalyzer(tmp, end, dpkt);
              tmp = payload.tmp;
              //strcpy(dataAnswer[ansI],payload.data);
              //payload.name= label;
              printf("Answer name: %s type: %s class: %s ttl: %d rdata: %s\n", payload.name,   payload.type,   payload.class, payload.ttl, payload.data);
              if(ansI==0){
                snprintf(buffer, sizeof(buffer), "  {\n   \"name\": \"%s\",\n   \"type\": \"%s\",\n   \"class\": \"%s\",\n   \"ttl\": %d,\n   \"rdata\": \"%s\"\n  }",  payload.name,   payload.type,   payload.class, payload.ttl, payload.data);
              }else{
                snprintf(buffer, sizeof(buffer), ",\n  {\n   \"name\": \"%s\",\n   \"type\": \"%s\",\n   \"class\": \"%s\",\n   \"ttl\": %d,\n   \"rdata\": \"%s\"\n  }",  payload.name,   payload.type,   payload.class, payload.ttl, payload.data);
              }
              fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);

              if (tmp >= end){
                  snprintf(buffer, sizeof(buffer), "\n ],\n \"authority\": [\n\n ],\n \"additional\": [\n\n ]\n");
                  fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
                  goto ret;
               }
          }
          snprintf(buffer, sizeof(buffer), "\n ],\n");
          fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
        } else{
          snprintf(buffer, sizeof(buffer), " \"answer\": [\n\n ],\n");
          fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
        }



        //Output of Authority
        if(dnsh->nscount !=0){
          //if(dnsh->ancount !=0) goto failParse;
          snprintf(buffer, sizeof(buffer), " \"authority\": [\n");
          fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
          for (int ansI = 0; ansI < dnsh->nscount; ansI++) {
            struct payload_data payload = payoadAnalyzer(tmp, end, dpkt);
            tmp = payload.tmp;
            //if(strcmp(payload.type,"NS")==0){
              printf("Authority name: %s type: %s class: %s ttl: %d rdata: %s\n", payload.name, payload.type, payload.class, payload.ttl, payload.data);
              if(ansI==0){
                snprintf(buffer, sizeof(buffer), "  {\n   \"name\": \"%s\",\n   \"type\": \"%s\",\n   \"class\": \"%s\",\n   \"ttl\": %d,\n   \"rdata\": \"%s\"\n  }",  payload.name,   payload.type,   payload.class, payload.ttl, payload.data);
              }else{
                snprintf(buffer, sizeof(buffer), ",\n  {\n   \"name\": \"%s\",\n   \"type\": \"%s\",\n   \"class\": \"%s\",\n   \"ttl\": %d,\n   \"rdata\": \"%s\"\n  }",  payload.name,   payload.type,   payload.class, payload.ttl, payload.data);
              }
              fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
          //  }else{
            //  goto failParse;
            //}
            if (tmp >= end){
               snprintf(buffer, sizeof(buffer), "\n ],\n \"additional\": [\n\n ]\n");
               fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
               goto ret;
             }
          }
          snprintf(buffer, sizeof(buffer), "\n ],\n");
          fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
        }else{
          snprintf(buffer, sizeof(buffer), " \"authority\": [\n\n ],\n");
          fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
        }



        //Output additional
        if(dnsh->arcount!=0){
          //if (dnsh->arcount != dnsh->ancount && dnsh->arcount != dnsh->nscount) goto failParse;
          snprintf(buffer, sizeof(buffer), " \"additional\": [\n");
          fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
          for (int ansI=0;ansI<dnsh->arcount;ansI++) {
            struct payload_data payload = payoadAnalyzer(tmp, end, dpkt);
            tmp = payload.tmp;
            printf("Additional name: %s type: %s class: %s ttl: %d rdata: %s\n", payload.name,   payload.type,   payload.class, payload.ttl, payload.data);
            if(ansI==0){
              snprintf(buffer, sizeof(buffer), "  {\n   \"name\": \"%s\",\n   \"type\": \"%s\",\n   \"class\": \"%s\",\n   \"ttl\": %d,\n   \"rdata\": \"%s\"\n  }",  payload.name,   payload.type,   payload.class, payload.ttl, payload.data);
            }else{
              snprintf(buffer, sizeof(buffer), ",\n  {\n   \"name\": \"%s\",\n   \"type\": \"%s\",\n   \"class\": \"%s\",\n   \"ttl\": %d,\n   \"rdata\": \"%s\"\n  }",  payload.name,   payload.type,   payload.class, payload.ttl, payload.data);
            }
            fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);

            if (tmp >= end){
               snprintf(buffer, sizeof(buffer), "\n ]\n");
               fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
               goto ret;
             }
          }
          snprintf(buffer, sizeof(buffer), "\n ]\n");
          fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
        }else{
          snprintf(buffer, sizeof(buffer), " \"additional\": [\n\n ]\n");
          fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
        }

goto ret;

failParse:
      free(fileOutput);
      return 1;


  ret:
      snprintf(buffer, sizeof(buffer), "}");
      fileOutput = realloc (fileOutput,strlen(fileOutput)+strlen(buffer)+1); strcat(fileOutput, buffer);
      fprintf(f, "%s", fileOutput);
      free(fileOutput);
      return 0;

}


//DEBUGGING CODE
//printf("Starting point for next: %x\n", ntohs(*(uint32_t *)tmp));
//tmp = tmp+2;
//printf("data: %x\n", ntohs(*(uint32_t *)tmp));
//tmp = tmp+2;
//printf("data: %x\n", ntohs(*(uint32_t *)tmp));
