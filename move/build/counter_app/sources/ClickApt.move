// module counter_addr::counter{
//     use std::signer;
//     #[test_only]
//     use aptos_framework::account;


//     const E_NOT_INITIALIZED: u64 = 1;

//     struct CountHolder has key {
//         count: u64
//     }

    
                    
//     public entry fun initialize(account: &signer) {
//         let addr = signer::address_of(account);
    
//         if (!exists<CountHolder>(addr)) {
//             move_to(account, CountHolder { count: 0 });
//         }
//     }


//     public entry fun increment(account: &signer) acquires CountHolder {
//        let addr = signer::address_of(account);
//        assert!(exists<CountHolder>(addr), E_NOT_INITIALIZED);
//        let countvar = borrow_global_mut<CountHolder>(addr);
//        let counter = countvar.count + 1;
//        countvar.count = counter;
//     }

//     #[test(admin = @0x123)]
//     public entry fun test_flow(admin: signer) acquires CountHolder {
//         account::create_account_for_test(signer::address_of(&admin));
//         initialize(&admin);
//         increment(&admin);
      
//     }

// }


module counter_addr::ClickApt{
    use std::signer;

    struct GlobalCount has key,store {
        count: u64, // norma user clicks
        total: u64  
    }

    public fun get_count(addr: address): u64 acquires GlobalCount {
        assert!(exists<GlobalCount>(addr), 0);
        *&borrow_global<GlobalCount>(addr).count
    }

    public entry fun increment(account: signer,global_addr: address) acquires GlobalCount {
        let addr = signer::address_of(&account);
        if (!exists<GlobalCount>(addr)) {
            move_to(&account, GlobalCount {
                count: 1,
                total:1
            })
        } else {
            let old_count = borrow_global_mut<GlobalCount>(addr);
            old_count.count = old_count.count + 1;
        };

        if (!exists<GlobalCount>(global_addr)) {
            move_to(&account, GlobalCount {
                count: 1,
                total:1
            })
        } else {
            let old_count = borrow_global_mut<GlobalCount>(global_addr);
            old_count.total = old_count.total + 1;
        };
        
    }
}