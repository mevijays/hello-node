graph TD
    %% External Traffic
    User((User/Client)) -->|HTTPS: webapp.mylab.lan| MLB[MetalLB / LoadBalancer IP]

    subgraph istio-system [Namespace: istio-system]
        MLB --> IGW[Istio Ingress Gateway Proxy]
        IGW -.->|Uses Secret| Cert[(wcc-cert Secret)]
        GW[Istio Gateway Resource] --- IGW
    end

    subgraph app-ns [Namespace: my-app]
        IGW -->|Route by Hostname| VS[VirtualService]
        
        %% Traffic Splitting Logic
        VS -->|90% Weight| S1[Subset: v1]
        VS -->|10% Weight| S2[Subset: v2]

        %% Destination Rule Logic
        DR[DestinationRule] -.->|Defines Subsets| S1
        DR -.->|Defines Subsets| S2

        %% The Kubernetes Service
        S1 --> SVC[webapp-service]
        S2 --> SVC

        %% Actual Pods
        SVC -->|Label version=v1| PodV1[webapp-v1 Pods]
        SVC -->|Label version=v2| PodV2[webapp-v2 Pods]
    end

    %% Styling
    style IGW fill:#f9f,stroke:#333,stroke-width:2px
    style VS fill:#bbf,stroke:#333,stroke-width:2px
    style DR fill:#dfd,stroke:#333,stroke-width:2px
    style PodV2 fill:#fff4dd,stroke:#d4a017,stroke-dasharray: 5 5
