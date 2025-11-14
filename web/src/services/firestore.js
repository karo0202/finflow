import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp
} from 'firebase/firestore'
import { db } from '../config/firebase'

// Portfolio operations
export const getPortfolio = async (userId) => {
  try {
    const portfolioRef = doc(db, 'portfolios', userId)
    const portfolioSnap = await getDoc(portfolioRef)
    
    if (portfolioSnap.exists()) {
      return portfolioSnap.data()
    }
    
    // Create default portfolio if doesn't exist
    const defaultPortfolio = {
      userId,
      holdings: [],
      totalValue: 0,
      lastUpdated: Timestamp.now(),
    }
    await setDoc(portfolioRef, defaultPortfolio)
    return defaultPortfolio
  } catch (error) {
    console.error('Error getting portfolio:', error)
    throw error
  }
}

export const updatePortfolio = async (userId, portfolioData) => {
  try {
    const portfolioRef = doc(db, 'portfolios', userId)
    await updateDoc(portfolioRef, {
      ...portfolioData,
      lastUpdated: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error updating portfolio:', error)
    throw error
  }
}

export const addHolding = async (userId, holding) => {
  try {
    const portfolioRef = doc(db, 'portfolios', userId)
    const portfolioSnap = await getDoc(portfolioRef)
    
    let holdings = []
    if (portfolioSnap.exists()) {
      holdings = portfolioSnap.data().holdings || []
    }
    
    const newHolding = {
      id: Date.now().toString(),
      ...holding,
      addedAt: Timestamp.now(),
    }
    
    holdings.push(newHolding)
    
    // Calculate total value
    const totalValue = holdings.reduce((sum, h) => sum + (h.value || h.price * (h.shares || h.amount || 0)), 0)
    
    await setDoc(portfolioRef, {
      userId,
      holdings,
      totalValue,
      lastUpdated: Timestamp.now(),
    }, { merge: true })
    
    return newHolding
  } catch (error) {
    console.error('Error adding holding:', error)
    throw error
  }
}

export const deleteHolding = async (userId, holdingId) => {
  try {
    const portfolioRef = doc(db, 'portfolios', userId)
    const portfolioSnap = await getDoc(portfolioRef)
    
    if (!portfolioSnap.exists()) return
    
    const holdings = portfolioSnap.data().holdings.filter(h => h.id !== holdingId)
    const totalValue = holdings.reduce((sum, h) => sum + (h.value || h.price * (h.shares || h.amount || 0)), 0)
    
    await updateDoc(portfolioRef, {
      holdings,
      totalValue,
      lastUpdated: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error deleting holding:', error)
    throw error
  }
}

// Transaction operations
export const getTransactions = async (userId, limitCount = 10) => {
  try {
    const transactionsRef = collection(db, 'transactions')
    const q = query(
      transactionsRef,
      where('userId', '==', userId),
      orderBy('date', 'desc'),
      limit(limitCount)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate?.() || doc.data().date,
    }))
  } catch (error) {
    console.error('Error getting transactions:', error)
    return []
  }
}

export const addTransaction = async (userId, transaction) => {
  try {
    const transactionsRef = collection(db, 'transactions')
    await addDoc(transactionsRef, {
      userId,
      ...transaction,
      date: transaction.date ? Timestamp.fromDate(new Date(transaction.date)) : Timestamp.now(),
      createdAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error adding transaction:', error)
    throw error
  }
}

// Goals operations
export const getGoals = async (userId) => {
  try {
    const goalsRef = collection(db, 'goals')
    const q = query(
      goalsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      deadline: doc.data().deadline?.toDate?.() || doc.data().deadline,
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
    }))
  } catch (error) {
    console.error('Error getting goals:', error)
    return []
  }
}

export const addGoal = async (userId, goal) => {
  try {
    const goalsRef = collection(db, 'goals')
    const docRef = await addDoc(goalsRef, {
      userId,
      ...goal,
      current: goal.current || 0,
      deadline: Timestamp.fromDate(new Date(goal.deadline)),
      createdAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding goal:', error)
    throw error
  }
}

export const updateGoal = async (goalId, updates) => {
  try {
    const goalRef = doc(db, 'goals', goalId)
    await updateDoc(goalRef, {
      ...updates,
      deadline: updates.deadline ? Timestamp.fromDate(new Date(updates.deadline)) : undefined,
    })
  } catch (error) {
    console.error('Error updating goal:', error)
    throw error
  }
}

export const deleteGoal = async (goalId) => {
  try {
    const goalRef = doc(db, 'goals', goalId)
    await deleteDoc(goalRef)
  } catch (error) {
    console.error('Error deleting goal:', error)
    throw error
  }
}

// Budget operations
export const getBudget = async (userId) => {
  try {
    const budgetRef = doc(db, 'budgets', userId)
    const budgetSnap = await getDoc(budgetRef)
    
    if (budgetSnap.exists()) {
      return budgetSnap.data()
    }
    
    // Create default budget
    const defaultBudget = {
      userId,
      income: 0,
      categories: [],
      createdAt: Timestamp.now(),
    }
    await setDoc(budgetRef, defaultBudget)
    return defaultBudget
  } catch (error) {
    console.error('Error getting budget:', error)
    return { userId, income: 0, categories: [] }
  }
}

export const updateBudget = async (userId, budgetData) => {
  try {
    const budgetRef = doc(db, 'budgets', userId)
    await setDoc(budgetRef, {
      ...budgetData,
      lastUpdated: Timestamp.now(),
    }, { merge: true })
  } catch (error) {
    console.error('Error updating budget:', error)
    throw error
  }
}

// Community operations
export const getCommunityPosts = async (category = 'All', limitCount = 20) => {
  try {
    const postsRef = collection(db, 'community')
    let q = query(
      postsRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    
    if (category !== 'All') {
      q = query(
        postsRef,
        where('category', '==', category),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      )
    }
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
    }))
  } catch (error) {
    console.error('Error getting community posts:', error)
    return []
  }
}

export const addCommunityPost = async (userId, post) => {
  try {
    const postsRef = collection(db, 'community')
    const docRef = await addDoc(postsRef, {
      userId,
      authorName: post.authorName,
      ...post,
      likes: 0,
      comments: 0,
      createdAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Error adding community post:', error)
    throw error
  }
}

// Real-time subscriptions
export const subscribeToPortfolio = (userId, callback) => {
  const portfolioRef = doc(db, 'portfolios', userId)
  return onSnapshot(portfolioRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data())
    }
  })
}

export const subscribeToTransactions = (userId, callback) => {
  const transactionsRef = collection(db, 'transactions')
  const q = query(
    transactionsRef,
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(10)
  )
  return onSnapshot(q, (snapshot) => {
    const transactions = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate?.() || doc.data().date,
    }))
    callback(transactions)
  })
}

