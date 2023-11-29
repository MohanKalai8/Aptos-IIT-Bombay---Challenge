module counter_addr::ClickApt{
    use std::signer;

    struct GlobalCount has key,store {
        count: u64, 
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